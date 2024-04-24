import Posts from "@/components/Posts";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-3 pt-4">
        {/* <CreatePost /> */}
        <div className="mt-2 space-x-3">
          <Button variant="outline">All Posts</Button>
        </div>
        <div className="mt-2">
          <Posts />
        </div>
      </div>
    </div>
  );
}
