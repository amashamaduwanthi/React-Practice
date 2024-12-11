import './App.css';
import { Customer } from "./assets/Customer.ts";
import { useState } from "react";

function App() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [deleteEmail, setDeleteEmail] = useState(''); // State for the email to delete


    const [searchEmail, setSearchEmail] = useState('');
    const [foundCustomer, setFoundCustomer] = useState<Customer | null>(null);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');

    function addCustomer() {
        if (name && email && phone) { // Ensure all fields are filled
            const newCustomer = new Customer(name, email, phone);
            setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
            setName('');
            setEmail('');
            setPhone('');
        } else {
            alert('Please fill all fields.');
        }
    }
    function deleteCustomer() {
        setCustomers((customers) =>customers.slice(0,-1));
    }
    function deleteCustomerByEmail() {
        if (deleteEmail) {
            setCustomers((prevCustomers) =>
                prevCustomers.filter((customer) => customer.email !== deleteEmail)
            );
            setDeleteEmail(''); // Clear the delete email input
        } else {
            alert('Please enter an email to delete.');
        }
    }
    function searchCustomer() {
        const customer = customers.find((c) => c.email === searchEmail);
        if (customer) {
            setFoundCustomer(customer);
            setNewName(customer.name); // Pre-fill the current details
            setNewPhone(customer.phone);
        } else {
            alert('Customer not found.');
            setFoundCustomer(null);
        }
    }

    function updateCustomer() {
        if (foundCustomer) {
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) =>
                    customer.email === foundCustomer.email
                        ? new Customer(newName || customer.name, customer.email, newPhone || customer.phone)
                        : customer
                )
            );
            alert('Customer updated successfully.');
            setFoundCustomer(null); // Reset the found customer
            setSearchEmail(''); // Clear the search field
            setNewName('');
            setNewPhone('');
        } else {
            alert('No customer selected for update.');
        }
    }

    return (
        <>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <br/>
            <button onClick={addCustomer}>Add Customer</button>
            <br/>
            <button onClick={deleteCustomer}>Delete Customer</button>
            <br/>
            <input
                type="text"
                placeholder="Email to delete"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
            />
            <button onClick={deleteCustomerByEmail}>Delete Customer by Email</button>

            {customers.length > 0 ? (
                <div>
                    <h2>Customer List:</h2>
                    {customers.map((customer, index) => (
                        <div key={index}>
                            <p>
                                <strong>Name:</strong> {customer.name}
                                <br/>
                                <strong>Email:</strong> {customer.email}
                                <br/>
                                <strong>Phone:</strong> {customer.phone}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <h3>No customers added yet.</h3>
            )}


            {/* Search Customer Section */}
            <input
                type="text"
                placeholder="Email to search"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
            />
            <button onClick={searchCustomer}>Search Customer</button>
            <br/>

            {/* Update Customer Section */}
            {foundCustomer && (
                <div>
                    <h3>Update Customer:</h3>
                    <p>
                        <strong>Current Name:</strong> {foundCustomer.name}
                        <br/>
                        <strong>Current Phone:</strong> {foundCustomer.phone}
                    </p>
                    <input
                        type="text"
                        placeholder="New Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="New Phone"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                    />
                    <button onClick={updateCustomer}>Update Customer</button>
                </div>
            )}

            {/* Customer List Section */}
            {customers.length > 0 ? (
                <div>
                    <h2>Customer List:</h2>
                    {customers.map((customer, index) => (
                        <div key={index}>
                            <p>
                                <strong>Name:</strong> {customer.name}
                                <br/>
                                <strong>Email:</strong> {customer.email}
                                <br/>
                                <strong>Phone:</strong> {customer.phone}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <h3>No customers added yet.</h3>
            )}


        </>
    );
}

export default App;