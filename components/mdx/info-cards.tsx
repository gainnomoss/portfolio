import Image from "next/image";

export function InfoCards({
  items,
}: {
  items: { image: string; imageAlt: string; title: string; body: string }[];
}) {
  return (
    <div className="mx-auto grid max-w-reading grid-cols-1 gap-8 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-md">
            <Image
              src={item.image}
              alt={item.imageAlt}
              width={368}
              height={154}
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-title-md text-ink">{item.title}</p>
            <p className="text-body-md text-body">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
