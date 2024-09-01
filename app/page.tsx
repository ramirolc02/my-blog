import Posts from "./components/Posts"
export const revalidate = 86400

export default function Home() {
  return (
    <div className="mx-auto">
      {/* <ProfilePic /> */}
      <h1 className="mt-12 mb-12 text-3xl text-center dark:text-white font-bold break-words px-2">
        Ramiro Lopez Cento's Website
      </h1>
      <Posts />
    </div>
  )
}
