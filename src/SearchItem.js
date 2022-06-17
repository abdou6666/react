import React from 'react';
function SearchItem({ search, setSearch, items, setItems }) {
	return (
		<form>
			<input
				placeholder="search"
				type="search"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
		</form>
	);
}

export default SearchItem;
