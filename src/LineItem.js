import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

function LineItem({ item, handleClick, handleDelete }) {
	return (
		<li>
			<label
				style={item.checked ? { textDecoration: 'line-through' } : null}
				onDoubleClick={() => {
					handleClick(item.id);
				}}>
				{item.name}
			</label>
			<input
				type="checkbox"
				checked={item.checked}
				onChange={() => {
					handleClick(item.id);
				}}
			/>
			<FaTrashAlt
				role="button"
				tabIndex="0"
				aria-label={`Delete ${item.name}`}
				onClick={() => {
					handleDelete(item.id);
				}}
			/>
		</li>
	);
}

export default LineItem;
