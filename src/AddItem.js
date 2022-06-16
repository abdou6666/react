import { React, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
function AddItem({ newItem, setNewItem, handleSubmit }) {
	// const item = useRef();
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	setItems([
	// 		...items,
	// 		{
	// 			id: Math.floor(Math.random()),
	// 			name: item.current.value,
	// 			checked: false
	// 		}
	// 	]);
	// };

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="addItem">Add Item</label>
			<input
				autoFocus
				type="text"
				id="addItem"
				placeholder="add item"
				onChange={(e) => {
					setNewItem(e.target.value);
				}}
				value={newItem}
				required
			/>

			<button type="submit" aria-label="Add Item">
				<FaPlus />
			</button>
		</form>
	);
}

export default AddItem;
