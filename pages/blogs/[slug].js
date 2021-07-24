import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: "l8hvjl5jmdb6",
  accessToken: "zKDgk4EQgJdVqSGHJc4EfQzLtXELAkpO6NUWSAZotxg",
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "blog" });

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });
  return {
    paths: paths,
    fallback: true, //shows a 404 page instead a fallback page
  };
};

export async function getStaticProps({ params }) {
  //props is the path.params (above)
  const { items } = await client.getEntries({
    //get res.item
    content_type: "blog",
    "fields.slug": params,
  });
  return {
    props: {
      blog: items[0],
    },
    revalidate: 1,
  };
}

export default function Details({ blog }) {
  if (!blog) return <h1>loafing</h1>;
  return <div>{documentToReactComponents(blog.fields.post)}</div>;
}
