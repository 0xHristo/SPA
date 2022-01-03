
export function RemovableItem(props) {
  const { name, onRemove } = props;
  return (
    <div className="removable" onClick={() => onRemove(name)}>
      {name}
    </div>
  );
}