import { ImageLoaderProps } from "next/image";

const localImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return "/assets/" + src;
};

export default localImageLoader;
