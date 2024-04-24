import { useRef } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/axios/axios";
import toast from "react-hot-toast";
export default function CreatePost() {
  const postTitleRef = useRef();
  const postContentRef = useRef();
  const queryClient = useQueryClient();
  const { mutateAsync: addNewPost } = useMutation({
    mutationFn: async (data) => {
      return await axios.post("/posts/create-post", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Posts"]);
    },
  });
  const handlePost = async () => {
    const data = {
      user: {
        name: "Dawson",
        email: "dawson@gmail.com" || "",
        avatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ||
          "",
      },
      title: postTitleRef.current.value,
      content: postContentRef.current.value,
    };
    try {
      await addNewPost(data);
      toast.success("Post created successfully!!");
      postContentRef.current.value = "";
      postTitleRef.current.value = "";
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="bg-white p-4 rounded-md">
        <Input
          ref={postTitleRef}
          placeholder="title"
          className="placeholder:text-base text-lg"
          required
        />
        <Textarea
          ref={postContentRef}
          className="placeholder:text-base text-lg mt-2"
          placeholder="type post content..."
          required
        />
        <div className="flex justify-end mt-3">
          <Button onClick={() => handlePost()}>Post</Button>
        </div>
      </div>
    </div>
  );
}
