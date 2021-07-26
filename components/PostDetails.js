import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { useRouter } from "next/router";

function PostDetails({ blog }) {
  const router = useRouter();

  function createMarkup() {
    let doc = blog.fields.post;
    return { __html: documentToReactComponents(doc) };
  }

  return (
    <div className="post">
      <div className="home" onClick={() => router.push("/")}>
        Go back home
      </div>
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

      <div className="postText">
        <div dangerouslySetInnerHTML={createMarkup()} />;
      </div>
      <style jsx>{`
        .home {
          position: absolute;
          left: 20px;
          top: 20px;
          color: red;
        }
        .title {
          text-align: center;
          font-size: calc(1vw + 12px);
          font-weight: bold;
          font-family: monospace;
          margin-bottom: 20px;
        }

        .imgWrapper {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          border-radius: 10px;
          padding: 1rem;
        }

        .postText > h1 {
          position: relative;
          width: 100%;
          color: red !important;
        }
      `}</style>
    </div>
  );
}

export default PostDetails;
