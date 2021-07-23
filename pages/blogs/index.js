import {createClient} from "contentful"
import Image from "next/image"
import {documentToReactComponents} from "@contentful/rich-text-react-renderer"
export async function getStaticProps() {

const client=createClient({
space:"l8hvjl5jmdb6" ,
accessToken:"zKDgk4EQgJdVqSGHJc4EfQzLtXELAkpO6NUWSAZotxg" ,
})

const response=await client.getEntries({content_type: "blog"})

return {
props :{
blogs: response.items
}
}
}



function index({blogs}) {


    {console.log(blogs)}
    return (
        <div>
    {blogs.map(blog=> (
<div key={blog.sys.id}>


{blog.fields.title}


<Image src={`https:` + blog.fields.images.fields.file.url} width={400} height={400} />
{documentToReactComponents(blog.fields.post)}
    </div>



    ))}
        </div>
    )
}

export default index
