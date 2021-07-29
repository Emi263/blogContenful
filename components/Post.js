import Link from "next/link";
import Image from "next/image";
const Post = ({ blog, setBlogs, blogs, setCurrentPage }) => {
  return (
    <div className="post">
      <div className="title">{blog.fields.title}</div>
      <div className="imgWrapper">
        <Image
          src={`https:` + blog.fields.images.fields.file.url}
          width={300}
          height={200}
          objectFit="cover"
          layout="responsive"
          quality={10}
          className="img"
        />
      </div>
      <div className="blog-desc">{blog.fields.description}</div>{" "}
      <div className="tags">
        {console.log(blog.fields.tags)}
        {blog.fields.tags.map((tag) => (
          <div key={tag} className="li">
            #
            <li
              onClick={(e) => {
                setCurrentPage(1);
                setBlogs(
                  blogs.filter((blog) =>
                    blog.fields.tags.includes(e.target.innerHTML)
                  )
                );
              }}
              key={tag}
            >
              {tag}
            </li>
          </div>
        ))}
      </div>
      <Link passHref={true} href={"/blogs/" + blog.fields.slug}>
        <a>Read more</a>
      </Link>
      <style jsx>{`
        .post {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          margin: 20px 20px;
        }

        .title {
          padding: 1rem;
          font-family: monospace;
          font-size: calc(1vw + 12px);
          font-weight: bold;
          cursor: pointer;
        }

        .imgWrapper {
          background: gray;
          margin: 0 auto;
          border-radius: 10px;
          width: 100%;
        }
        .blog-desc {
          width: 100%;
          font-family: monospace;
          font-size: calc(1vw + 10px);
          padding: 1rem;
          text-align: center;
        }

        .tags {
          display: flex;
          gap: 20px;
          margin-bottom: 10px;
        }
        .tags .li {
          display: flex;
          list-style-type: none;
          background: #00ffea;
          color: black;
          cursor: pointer;
        }

        a {
          display: inline-block;
          padding: 0.3rem;
          font-size: calc(1vw + 10px);
          background: blue;
          color: white;
          font-weight: 400;
          border-radius: 10px;
          transition: 0.3s ease-in-out;
        }

        a:hover {
          transform: scale(1.09);
        }
      `}</style>
    </div>
  );
};
export default Post;
