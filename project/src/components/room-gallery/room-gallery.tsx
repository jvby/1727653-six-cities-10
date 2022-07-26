
type RoomGalleryProp = {
  images: [string] | undefined;
  type: string | undefined;
}

export function RoomGallery({ images, type }: RoomGalleryProp): JSX.Element {

  const renderImages = () => images?.map((image) => (
    <div key={`picture-${image}`} className="property__image-wrapper">
      <img className="property__image" src={image} alt={type}/>
    </div>
  ));

  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {renderImages()}
      </div>
    </div>
  );
}
