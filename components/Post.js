import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import Image from "next/image";
const Post = ({ blog }) => {
  return (
    <div className="post">
      <div className="title">{blog.fields.title}</div>
      <div className="imgWrapper">
        <Image
          src={`https:` + blog.fields.images.fields.file.url}
          width={500}
          height={400}
          objectFit="cover"
          layout="responsive"
          quality={10}
          className="img"
        />
      </div>

      <div className="blog-desc">
        {documentToReactComponents(
          blog.fields.post
        )[0].props.children[0].substr(0, 3)}
        <span>...</span>
      </div>
      <a href="">
        {" "}
        <Link href={"/blogs/" + blog.fields.slug}>Read more </Link>
      </a>

      <style jsx>{`
        .post {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          margin: 0 20px;
        }

        .title {
          padding: 1rem;
          font-family: monospace;
          font-size: calc(1vw + 12px);
          font-weight: bold;
          cursor: pointer;
        }

        .imgWrapper {
          max-width: 800px;
          width: 100%;

          margin: 0 auto;
          border-radius: 10px;
        }

        .blog-desc {
          width: 100%;
          font-family: monospace;
          font-size: calc(1vw + 10px);
          padding: 1rem;
        }

        a {
          display: inline-block;
          padding: 1rem;
          font-size: calc(1vw + 12px);
          background: blue;
          color: white;
          font-weight: 700;
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
