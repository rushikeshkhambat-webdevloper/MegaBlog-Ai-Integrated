import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, summary }) {
    let imageUrl = "";
    if (featuredImage) {
        const preview = appwriteService.getFilePreview(featuredImage);
        imageUrl = typeof preview === 'string' ? preview : preview.href;
    }

    return (
        <Link to={`/post/${$id}`} className="block h-full">
            <div className='w-full bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full'>
                <div className='w-full h-40 sm:h-48 bg-slate-100 overflow-hidden'>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                            No Image
                        </div>
                    )}
                </div>
                <div className="p-3 sm:p-5 flex flex-col flex-grow">
                    <h2 className='text-base sm:text-xl font-bold text-slate-900 line-clamp-2'>
                        {title}
                    </h2>
                    <p className='text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 sm:line-clamp-3 flex-grow'>
                        {summary || "No summary available."}
                    </p>
                    <span className="text-emerald-600 text-xs sm:text-sm font-medium mt-3 sm:mt-4 inline-block">
                        Read Article &rarr;
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default PostCard