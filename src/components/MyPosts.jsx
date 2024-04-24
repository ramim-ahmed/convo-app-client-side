import axios from "@/axios/axios";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Post from "./Post";
export default function MyPosts() {
  const { authUser } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["Posts"],
    queryFn: async () => {
      const data = await axios.get(`/posts/?email=${authUser?.email}`);
      return data?.data;
    },
  });
  return (
    <div>
      <div className="border rounded-md">
        {isLoading ? (
          <div className="flex justify-center pt-10">
            <Loader />
          </div>
        ) : (
          data?.data.map((post) => <Post key={post._id} post={post} />)
        )}
        {data?.length <= 0 && (
          <h1 className="text-xl text-center p-4">No Post</h1>
        )}
      </div>
    </div>
  );
}
