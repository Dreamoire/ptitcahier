interface CategoryFormButtonProps {
  categoryName: string;
}

function CategoryFormButton({ categoryName }: CategoryFormButtonProps) {
  return (
    <div>
      <input type="radio" id="1" name="autorisation" value="1" checked />
      <label htmlFor="1">{categoryName}</label>
    </div>
  );
}

export default CategoryFormButton;
