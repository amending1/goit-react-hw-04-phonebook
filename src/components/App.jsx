import React, { useState, useEffect } from 'react';
import css from './phonebook.module.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm.jsx';
import ContactList from './ContactList.jsx';
import Filter from './Filter.jsx';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  //Metoda jest wywoływana po zamontowaniu komponentu w drzewie DOM. Służy do sprawdzenia, czy w 'localtorage' istnieją wcześniej zappisane kontakty po kluczem 'contacts'. Jeśli istnieją to są pobierane i parsowane z JSON do obiektu JavaScript, a potem ustawiane jako stan 'contacts' za pomocą setState(). Dzięki temu, gdy użytkownik odświeży stronę lub przeładuje aplikację, wcześniej zapisane kontakty zostaną wczytane i wyświetlone.
  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  //Przypomnienie: localStorage.setItem(key, value) 

  //Metoda jest wywoływana po każdej aktualizacji komponentu. Porównujemy w niej poprzedni stan kontaktów (prevState.contacts) z aktualnym stanem kontaktów (this.state.contacts). Jeśli poprzedni stan jest różny od aktualnego, oznacza to, że stan kontaktów został zaktualizowany( użytkownik doda nowy kontakt lub usunie), więc zapisujemy nowy stan kontaktów do localStorage. Nowy stan jest zapisywany jako JSON za pomocą JSON.stringify(), aby można go było przechowywać w localStorage. To zapewnia trwałe przechowywanie danych nawet po ponownym załadowaniu strony lub odświeżeniu aplikacji.
  //JavaScript arrays have a type of Object. Objects are not compared based on their values but based on the references of the variables. A common and quite straightforward approach you can use to compare two arrays is first to convert these arrays to string form. There are two different methods that you can use: you can decide to convert your array to JSON text using the JSON.stringify() method, or you can use the .toString() method to return your array as a string.
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts.toString() !== this.state.contacts.toString()) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // };

  //REFACTORING
  //Funkcja ta zostanie wykonana za każdym razem, gdy którykolwiek z elementów w tablicy zależności zmieni się. Dzięki temu, zapis do localStorage nastąpi tylko wtedy, gdy contacts ulegnie zmianie, co odpowiada funkcji componentDidUpdate
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const handleSubmit = contact => {
    const { name, number } = contact;

    // Sprawdzanie, czy nazwa nowego kontaktu nie jest pusta - zabezpiecza przed dodaniem pustego pola
    if (name.trim() === '') return;

    //Metoda some() sprawdza, czy co najmniej jeden element tablicy spełnia warunek opisany przez callback (metoda zwroci 'true' lub 'false')
    const isExistingContact = contacts.some(
      existingContact =>
        existingContact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`Contact '${name}' already exists in the phonebook!`);
      return;
    }

    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };
//stan aplikacji jest aktualizowany poprzez dodanie nowego kontaktu do listy kontaktów za pomocą spread operatora
      
  
  //Za pomocą metody 'filter' na tablicy prevState.contacts, usuwamy z tablicy ten kontakt, którego 'id' odpowiada 'id' przekazanemu do metody 'handleDeleteContact'. Metoda 'filter' tworzy nową tablicę zawierającą tylko te elementy, które spełniają warunek podany w funkcji zwrotnej. W tym przypadku, usuwamy kontakt o 'id' równym 'id', które chcemy usunąć.
  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

const handleFilterChange = event => {
  setFilter(event.target.value.toLowerCase());
};

//.includes(filter) sprawdza, czy nazwa kontaktu zawiera podany ciąg znaków, który jest przechowywany w stanie jako filter. Jeśli tak, zwraca true, co oznacza, że kontakt zostanie zachowany
const filteredContacts = contacts.filter(contact =>
  contact.name.toLowerCase().includes(filter)
);

return (
  <div className="App">
    <div className={css['container']}>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  </div>
);
}
