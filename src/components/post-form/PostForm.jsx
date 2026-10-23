import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { generateContent, generateSummaryAndTags } from "../../appwrite/ai";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAIGenerate = async () => {
        const title = getValues("title");
        if (!title) {
            alert("Please enter a Title first so AI knows what to write about!");
            return;
        }

        setIsGenerating(true);
        setValue("content", "", { shouldValidate: false });

        const aiContent = await generateContent(title, (partialText) => {
            setValue("content", partialText, { shouldValidate: false });
        });

        setIsGenerating(false);

        if (aiContent) {
            setValue("content", aiContent, { shouldValidate: true });
        } else {
            alert("AI failed to generate content. Please try again.");
        }
    };

    const submit = async (data) => {
        if (!userData) {
            alert("You must be logged in to create or update a post!");
            navigate("/login");
            return;
        }

        let summary = "";
        let tags = "";

        if (data.content) {
            const aiResult = await generateSummaryAndTags(data.content);
            summary = aiResult.summary;
            tags = aiResult.tags;
        }

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) appwriteService.deleteFile(post.featuredImage);

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                summary,
                tags,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            if (!data.image || !data.image[0]) {
                alert("Please select a featured image!");
                return;
            }
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                data.featuredImage = file.$id;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    summary,
                    tags,
                    userId: userData.$id,
                });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-2">
            <div className="w-full lg:w-2/3 px-2">
                <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3 mb-4">
                    <div className="flex-1">
                        <Input
                            label="Title :"
                            placeholder="Title"
                            {...register("title", { required: true })}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleAIGenerate}
                        disabled={isGenerating}
                        className="px-3 py-2 mb-1 border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
                    >
                        {isGenerating ? "Thinking..." : "✨ Draft with AI"}
                    </button>
                </div>

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full lg:w-1/3 px-2 mt-4 lg:mt-0">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)?.href || appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}