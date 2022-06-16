import React from 'react';

import LineItem from './LineItem';

function ItemList({ items, handleClick, handleDelete }) {
	return (
		<ul>
			{items.map((item) => (
				<LineItem
					item={item}
					handleClick={handleClick}
					handleDelete={handleDelete}
					key={item.id}
				/>
			))}
		</ul>
	);
}

export default ItemList;
