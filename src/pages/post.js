import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { posts } from "@/pages/profile";

const Post = ({ currentPost }) => {
  const router = useRouter();

  if (!currentPost) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return (
    <Layout title={router.query.title} footer={false}>
      <div className="text-center">
        <img
          src={currentPost.imageURL}
          alt=""
          style={{ width: "50%" }}
          className="img-fluid"
        />
        <p className="p-4">{currentPost.content}</p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { title } = context.query;
  const currentPost = posts.find((post) => post.title === title);

  if (!currentPost) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentPost,
    },
  };
}

export default Post;
