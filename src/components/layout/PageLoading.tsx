import logo from "@/assets/logo.png";

const PageLoading = () => {
  return (
    <div className="h-screen w-full flex flex-col gap-4 bg-gray-200 items-center justify-center animate-in">
      <img src={logo} className="object-contain size-14  animate-pulse" />
      {/* <img src={logo} className="object-contain size-14  animate-ping" /> */}
      {/* <LoaderPinwheel className="animate-spin text-accent" /> */}
    </div>
  );
};

export default PageLoading;
