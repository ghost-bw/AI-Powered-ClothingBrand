
const CollectionCard = (props) => {
  return (
    <div
      className="
        flex-shrink-0
        w-[80%]
        sm:w-[50%]
        md:w-[35%]
        lg:w-[23%]
        cursor-pointer">
      <div className="overflow-hidden rounded-2xl group aspect-[8/9]">
        <img
          src={props.img}
          alt={props.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {props.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {props.type}
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;
