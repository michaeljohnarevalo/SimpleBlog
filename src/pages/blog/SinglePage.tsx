import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import type { AppDispatch,  RootState } from "../../app/store";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { fetchBlogId } from "../../app/blogThunks";
import { addComments, fetchComments, uploadImage } from "../../app/commentThunks";

export default function SinglePage(){
    const {id} = useParams();
    const navigate = useNavigate();
    const {currentBlog} = useSelector((state:RootState)=> state.blogs)
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state:RootState)=> state.auth.user?.id)
    
    const [commentText, setCommentText] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const {comments, loading} = useSelector((state:RootState)=> state.comments)
    const user = useSelector((state:RootState)=> state.auth.user)

    useEffect(()=>{
        if(id){
            dispatch(fetchBlogId(id))
            dispatch(fetchComments(id))
        }
    },[id,dispatch])

    const handleSubmit = async(e : FormEvent)=>{
        e.preventDefault()

        try{
            let imageUrl = "";

            if(image){
                const result = await dispatch(uploadImage({file:image}))
                if(uploadImage.fulfilled.match(result)){
                    imageUrl = result.payload
                }
            }

            dispatch (addComments({
                content: commentText,
                post_id: id!,
                user_id: userId!, 
                image: imageUrl,
                user_email: user?.email || null
            }))

            setCommentText("")
            setImage(null)
        }catch(error){
            console.error("Failed to create a blog", error)
        }
    }

    const handleFileChange=(e: ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(file){
            setImage(file);
        }
    }

if(loading){
    return <h1 className="text-center text-lg md:text-xl p-4 ">Loading</h1>
  }

    return(
        <>
            <div className="max-w-3xl mx-auto px-4 py-6">
                <button onClick={()=> navigate('/')} className="mb-6 tex-sm text-blue-600 hover:underline">Back</button>
                <section className="bg-white rounded-xl shadow p-6 space-y-4">
                    <div>
                        <h1  className="text-2xl font-bold text-gray-900 mb-2 ">{currentBlog?.title}</h1>
                        <h5 className="text-sm text-gray-500">{currentBlog?.created_at && new Date(currentBlog.created_at).toLocaleString('en-US',{dateStyle:'short',timeStyle:'short'})} </h5>
                    </div>
                    <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                         {currentBlog?.content}
                    </div>
                    <div>
                    {currentBlog?.image && (
                        <div className="mt-4">
                        <img
                            className="w-full max-h-[400px] object-cover rounded-lg"
                            src={currentBlog.image}
                            alt={currentBlog.title}
                            />
                        </div>
                    )}
                    </div>
                </section>

                <section  className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">Comments</h2>
                    {user ? (
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 space-y-4">
                    <textarea placeholder="Leave a comment"
                    value={commentText}
                    onChange={(e)=> setCommentText(e.target.value)}
                    className="w-full min-h-[100px] border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex flex-row justify-end items-center " >
                    <label className="text-sm text-gray-400">Optional:</label>
                    <input
                    type="file"
                    className=" text-sm text-gray-500 px-4 py-4 file:mr-6 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleFileChange}
                    />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white text-sms border rounded-xl px-4 py-1">Post</button>
                </form>
                 ):(
                    <p className="mb-4 text-gray-900 ">You must be logged in to post a comment</p>
                 )}
                    <div  className="space-y-4 mt-6 max-width-1200">
                        {comments.map((comment)=>(
                        <div key={comment.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                            <span className="flex items-center justify-between mb-2">
                                <h6 className="font-medium text-gray-800 text-sm">{comment.username}</h6>
                                <h6 className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString('en-US',{dateStyle:'short',timeStyle:'short'})}</h6> {/*https://www.w3schools.com/jsref/jsref_tolocalestring.asp*/}
                            </span>
                            <p className="mb-4">{comment.content}</p>                        
                            {comment.image && <img src={comment.image} alt="comment image" className="h-40 w-60"/>}
                            
                        </div>
                        ))}                        
                    </div>
                </section>
            </div>
        </>
    )
}