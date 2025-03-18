const Filter = ({ newFilter, handleFilterChange }) => (
    <div>
        filter shown with <input
        value={newFilter}
        onChange={handleFilterChange}
        />
    </div>
)

const PersonForm = ({ handleSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => (
    <form onSubmit={handleSubmit}>
        <div>
            name: <input
                value={newName}
                onChange={handleNameChange}
            />
        </div>
        <div>
            number: <input
                value={newNumber}
                onChange={handleNumberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

const Persons = ({ persons }) => (
    <div>
        {persons.map(person =>
            <div key={person.name}>
                {person.name} {person.number}
            </div>
        )}
    </div>
)

export { Filter, Persons, PersonForm } 