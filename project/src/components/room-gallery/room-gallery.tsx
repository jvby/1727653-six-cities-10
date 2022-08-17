
type RoomGalleryProp = {
  images: [string] | undefined;
  type: string | undefined;
}

export function RoomGallery({ images, type }: RoomGalleryProp): JSX.Element {

  const imageForRender = images?.slice(0, 6);

  const renderImages = () => imageForRender?.map((image) => (
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
