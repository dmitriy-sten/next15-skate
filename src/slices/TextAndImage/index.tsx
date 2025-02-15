import { Bounded } from "@/components/bounded";
import { ButtonLink } from "@/components/button-link";
import { Heading } from "@/components/heading";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";
import { ParallaxImage } from "./parallax-image";
import { Slidein } from "@/components/slidein";

declare module "react" {
  interface CSSProperties {
    "--index"?: number;
  }
}

export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

const TextAndImage = ({ slice, index }: TextAndImageProps)=> {
  const theme = slice.primary.theme;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "sticky top-[calc(var(--index)*2rem)]",
        theme === "Blue" && "bg-texture bg-brand-blue text-white",
        theme === "Lime" && "bg-texture bg-brand-lime ",
        theme === "Orange" && "bg-texture bg-brand-orange text-white",
        theme === "Navy" && "bg-texture bg-brand-navy text-white"
      )}
      style={{ "--index": index }}
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2"
          )}
        >
          <Slidein>
            <Heading size="lg" as="h2">
              <PrismicText field={slice.primary.heading} />
            </Heading>
          </Slidein>
          <Slidein>
            <div className="max-w-md text-lg leading-relaxed">
              <PrismicRichText field={slice.primary.body} />
            </div>
          </Slidein>
          <Slidein>
            <ButtonLink
              color={theme === "Lime" ? "orange" : "lime"}
              field={slice.primary.button}
            >
              {slice.primary.button.text}
            </ButtonLink>
          </Slidein>
        </div>

        <ParallaxImage
          foregroundImage={slice.primary.foreground_image}
          backgroundImage={slice.primary.background_image}
        />
      </div>
    </Bounded>
  );
};

export default TextAndImage;
