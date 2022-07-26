
type RoomGoodsProp = {
  goods: string[] | undefined;
}

export function RoomGoods({ goods }: RoomGoodsProp): JSX.Element {

  const renderGoods = () => goods?.map((item) => (
    <li key={`item-${item}`}className="property__inside-item">
      {item}
    </li>
  ));

  return(
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {renderGoods()}
      </ul>
    </div>
  );

}
