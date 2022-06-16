import { useState } from 'react';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import SearchItem from './SearchItem';

function App() {
	const [ items, setItems ] = useState(JSON.parse(localStorage.getItem('shop')));

	const setAndSaveItems = (newItems) => {
		setItems(newItems);
		localStorage.setItem('shop', JSON.stringify(newItems));
	};
	const handleClick = (id) => {
		const newItems = items.map((item) => {
			if (item.id === id) {
				item.checked = !item.checked;
			}
			return item;
		});
		setAndSaveItems(newItems);
	};
	const handleDelete = (id) => {
		const newItems = items.filter((item) => item.id !== id);
		setAndSaveItems(newItems);
	};

	const [ newItem, setNewItem ] = useState('');
	const addItem = (item) => {
		let id;
		if (!items.length) {
			id = 1;
		} else {
			let itemsSorted = items.sort((a, b) => {
				return a.id - b.id;
			});
			id = itemsSorted[itemsSorted.length - 1].id + 1;
		}
		const newItems = [ ...items, { id, name: item, checked: false } ];
		console.log(newItems);
		setAndSaveItems(newItems);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newItem) return;
		addItem(newItem);
		setNewItem('');
	};
	return (
		<div className="App">
			<Header title="Groceries" />
			<SearchItem />
			<AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
			<Content items={items} handleClick={handleClick} handleDelete={handleDelete} />
			<Footer length={items.length} />
		</div>
	);
}

export default App;
