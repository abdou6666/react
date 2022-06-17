import { React, Fragment } from 'react';
import ItemList from './ItemList';
function Content({ items, handleClick, handleDelete }) {
	return (
		<Fragment>
			{items.length ? (
				<ItemList items={items} handleClick={handleClick} handleDelete={handleDelete} />
			) : (
				<p style={{ marginTop: '2rem' }}>Your list is empty.</p>
			)}
		</Fragment>
	);
}

export default Content;
