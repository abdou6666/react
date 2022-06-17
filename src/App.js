import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import SearchItem from './SearchItem';
import request from './apiRequest';

function App() {
	const API_URL = 'http://localhost:3500/items';

	const [ items, setItems ] = useState([]);
	const [ newItem, setNewItem ] = useState('');
	const [ search, setSearch ] = useState('');
	const [ fetchError, setFetchError ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);
	useEffect(() => {
		const fetchItems = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(API_URL);
				if (!response.ok) throw new Error('Did not recieve expected data.');
				const itemsList = await response.json();
				setItems(itemsList);
			} catch (error) {
				setFetchError(error.message);
			} finally {
				setIsLoading(false);
			}
		};
		setTimeout(() => {
			fetchItems();
		}, 1000);
		//	(async () => await fetchItems())();
	}, []);
	const handleClick = async (id) => {
		const newItems = items.map((item) => {
			if (item.id === id) {
				item.checked = !item.checked;
			}
			return item;
		});
		setItems(newItems);
		const item = newItems.find((item) => item.id === id);
		const updateOptions = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ checked: item.checked })
		};
		const reqUrl = `${API_URL}/${id}`;
		const response = await request(reqUrl, updateOptions);
		if (response) setFetchError(response);
	};
	const handleDelete = async (id) => {
		const newItems = items.filter((item) => item.id !== id);
		const item = items.find((item) => item.id === id);
		const deleteOptions = {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item)
		};
		const reqURL = `${API_URL}/${id}`;
		const response = await request(reqURL, deleteOptions);
		if (response) setFetchError(response);
		setItems(newItems);
	};

	const addItem = async (item) => {
		let id;
		if (!items.length) {
			id = 1;
		} else {
			let itemsSorted = items.sort((a, b) => {
				return a.id - b.id;
			});
			id = itemsSorted[itemsSorted.length - 1].id + 1;
		}
		const newItem = { id, name: item, checked: false };
		const newItems = [ ...items, newItem ];

		const postOption = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newItem)
		};
		const result = await request(API_URL, postOption);
		if (result) setFetchError(result);
		setItems(newItems);
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
			<SearchItem search={search} setSearch={setSearch} items={items} setItems={setItems} />
			<AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
			<main>
				{isLoading && <p>Loading items...</p>}
				{fetchError && <p style={{ color: 'red' }}>{`Error : ${fetchError}`}</p>}
				{!fetchError &&
				!isLoading && (
					<Content
						items={items.filter((item) => {
							return item.name.toLowerCase().includes(search.toLowerCase());
						})}
						handleClick={handleClick}
						handleDelete={handleDelete}
					/>
				)}
			</main>
			<Footer length={items.length} />
		</div>
	);
}

export default App;
