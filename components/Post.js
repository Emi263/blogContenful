import Link from "next/link";
import Image from "next/image";
import moment from "moment";
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
      <article className="blog-desc">{blog.fields.description}</article>{" "}
      <div className="tags">
        {blog.fields.tags.map((tag) => (
          <>
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
          </>
        ))}
      </div>
      <span className="time">{moment(blog.sys.createdAt).fromNow()}</span>
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
          background: hsl(200, 100%, 38%);
          color: white;
          cursor: pointer;
          padding: 0.3rem;
          border-radius: 5px;
          font-size: 12px;
          line-height: 1.5;
          letter-spacing: 1.5px;
          transition: ease-in 0.2s;
        }
        .tags .li:hover {
          background: hsl(29, 80%, 48%);
        }
        a {
          display: inline-block;
          padding: 0.3rem;
          font-size: calc(1vw + 12px);
          background: blue;
          color: white;
          font-weight: 400;
          border-radius: 5px;
          transition: 0.3s ease-in-out;
          font-family: "Poppins", sans-serif;
        }

        a:hover {
          transform: scale(1.09);
        }

        @media screen and (min-width: 700px) {
          a {
            font-size: calc(1vw + 6px);
          }
        }
      `}</style>
    </div>
  );
};
export default Post;
