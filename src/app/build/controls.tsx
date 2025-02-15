"use client";

import { Heading } from "@/components/heading";
import {
  ColorField,
  Content,
  ImageField,
  isFilled,
  KeyTextField,

} from "@prismicio/client";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import {ComponentProps, useEffect } from "react";
import { useCustomizerControls } from "./context";
import { useRouter } from "next/navigation";

type Props = Pick<
  Content.BoardCustomizerDocumentData,
  "wheels" | "decks" | "metals"
> & {
  className: string;
};
export function Controls({ className, wheels, decks, metals }: Props) {
  const router = useRouter();

  const {
    setBolt,
    setDeck,
    setTruck,
    setWheel,
    selectedBolt,
    selectedDeck,
    selectedTruck,
    selectedWheel,
  } = useCustomizerControls();

  useEffect(() => {
    const url = new URL(window.location.href);

    if (isFilled.keyText(selectedWheel?.uid)) {
      url.searchParams.set("wheel", selectedWheel.uid);
    }

    if (isFilled.keyText(selectedDeck?.uid)) {
      url.searchParams.set("deck", selectedDeck.uid);
    }

    if (isFilled.keyText(selectedTruck?.uid)) {
      url.searchParams.set("truck", selectedTruck.uid);
    }

    if (isFilled.keyText(selectedBolt?.uid)) {
      url.searchParams.set("bolt", selectedBolt.uid);
    }

    router.replace(url.href);
  }, [router, selectedBolt, selectedTruck, selectedDeck, selectedWheel]);

  return (
    <div className={clsx("flex flex-col gap-6", className)}>
      <Options title="Deck" selectedName={selectedDeck?.uid}>
        {decks.map((deck) => (
          <Option
            selected={deck.uid === selectedDeck?.uid}
            key={deck.uid}
            imageField={deck.texture}
            imgixParams={{
              rect: [20, 1550, 1000, 1000],
              width: 150,
              height: 150,
            }}
            onClick={() => setDeck(deck)}
          >
            {deck.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Wheels" selectedName={selectedWheel?.uid}>
        {wheels.map((wheel) => (
          <Option
            selected={wheel.uid === selectedWheel?.uid}
            key={wheel.uid}
            imageField={wheel.texture}
            imgixParams={{
              rect: [20, 10, 850, 850],
              width: 150,
              height: 150,
            }}
            onClick={() => setWheel(wheel)}
          >
            {wheel?.uid}
          </Option>
        ))}
      </Options>

      <Options title="Trucks" selectedName={selectedTruck?.uid}>
        {metals.map((metal) => (
          <Option
            selected={metal.uid === selectedTruck?.uid}
            key={metal.uid}
            colorField={metal.color}
            onClick={() => setTruck(metal)}
          >
            {metal?.uid}
          </Option>
        ))}
      </Options>
      <Options title="Bolts" selectedName={selectedBolt?.uid}>
        {metals.map((metal) => (
          <Option
            selected={metal.uid === selectedBolt?.uid}
            key={metal.uid}
            colorField={metal.color}
            onClick={() => setBolt(metal)}
          >
            {metal?.uid}
          </Option>
        ))}
      </Options>
    </div>
  );
}

type OptionPage = {
  title?: React.ReactNode;
  selectedName?: KeyTextField;
  children?: React.ReactNode;
};

function Options({ title, selectedName, children }: OptionPage) {
  const formatedName = selectedName?.replace(/-/g, " ");

  return (
    <div>
      <div className="flex">
        <Heading as="h2" size="xs" className="mb-2">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-300">
          <span className="select-none text-zinc-500">| </span>
          {formatedName}
        </p>
      </div>

      <ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
    </div>
  );
}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
  selected: boolean;
  children: React.ReactNode;
} & (
    | {
        imageField: ImageField;
        imgixParams?: PrismicNextImageProps["imgixParams"];
        colorField?: never;
      }
    | {
        colorField: ColorField;
        imageField?: never;
        imgixParams?: never;
      }
  );

function Option({
  children,
  imgixParams,
  imageField,
  selected,
  colorField,
  ...restProps
}: OptionProps) {
  return (
    <li>
      <button
        {...restProps}
        className={clsx(
          "size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white",
          selected && "outline"
        )}
      >
        {imageField ? (
          <PrismicNextImage
            field={imageField}
            imgixParams={imgixParams}
            className="pointer-events-none h-full w-full rounded-full"
            alt=""
          />
        ) : (
          <div
            className="size-full rounded-full"
            style={{ backgroundColor: colorField ?? undefined }}
          />
        )}

        <span className="sr-only">{children}</span>
      </button>
    </li>
  );
}
