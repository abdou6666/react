import React from 'react';
import { FaSearch } from 'react-icons/fa';
function SearchItem() {
	return (
		<form>
			<input type="search" />
            <FaSearch role="button" onClick={() => {
                
            }}/>
		</form>
	);
}

export default SearchItem;
