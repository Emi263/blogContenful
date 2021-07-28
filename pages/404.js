import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
function Error() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <div>
      <div>404</div>

      <div>
        {" "}
        <Link href="/">Click here</Link> or we are redirecting you to homepage
      </div>
    </div>
  );
}

export default Error;
