import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-6 sm:py-8">
            <Container>
                <div className="w-full flex flex-col sm:flex-row justify-center mb-4 sm:mb-6 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)?.href || appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full sm:w-auto max-h-[400px] object-cover"
                    />
                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="text-sm">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="text-sm">Delete</Button>
                        </div>
                    )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">{post.title}</h1>
                <div className="browser-css text-sm sm:text-base leading-relaxed">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}