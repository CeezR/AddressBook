package dev.cesar.addressbook.repository;

import dev.cesar.addressbook.exception.ContactNotFoundException;
import dev.cesar.addressbook.model.Contact;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class ContactRepository {
    List<Contact> contacts = new ArrayList<>();

    public ContactRepository() {
        contacts.add(new Contact(UUID.randomUUID().toString(), "Cesar", "test@gmail.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Jane", "janedoe@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Bob", "bobsmith@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Alice", "alicejohnson@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "James", "jameswilliams@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Emily", "emilybrown@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Michael", "michaeldavis@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Sarah", "sarahwilson@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "David", "davidclark@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Amanda", "amandaparker@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Brian", "brianwhite@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Jennifer", "jenniferlee@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Peter", "petergarcia@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Karen", "karenmartinez@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Kevin", "kevinbrown@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Lauren", "laurenjones@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Matthew", "matthewgonzalez@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Rachel", "rachelrodriguez@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Mark", "marktaylor@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Victoria", "victoriamoore@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Christopher", "christopherallen@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Samantha", "samanthayoung@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Steven", "stevenscott@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Rebecca", "rebeccahall@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Eric", "ericramirez@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Julia", "juliasanchez@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Patrick", "patrickmurphy@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Megan", "meganwilson@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Anthony", "anthonygonzalez@example.com"));
        contacts.add(new Contact(UUID.randomUUID().toString(), "Michelle", "michellejackson@example.com"));
    }

    public List<Contact> findAll() {
        return contacts;
    }

    public Contact findById(String id) throws ContactNotFoundException {
        return contacts.stream().filter(contact -> contact.getId().equals(id)).findFirst().orElseThrow(() -> new ContactNotFoundException());
    }

    public Contact Create(Contact contact) {
        contacts.add(contact);
        return contact;
    }

    public void update(Contact contact, String id) {
//        Contact contactExists = null;
//        for (Contact c : contacts) {
//            if (c.getId().equals(id)) {
//                contactExists = c;
//                break;
//            }
//        }
//
//        if (contactExists == null) {
//            throw new IllegalArgumentException("Contact not found");
//        }
        Contact contactExists = contacts.stream().filter(c -> c.getId().equals(id)).findFirst().orElseThrow(() -> new IllegalArgumentException("Contact not found"));
        int i = contacts.indexOf(contactExists);
        contacts.set(i, contact);
    }

    public void delete(String id) {
        contacts.removeIf(contact -> contact.getId().equals(id));
    }

    public List<Contact> findByName(String name) {
        return contacts.stream().filter(contact -> contact.getName().regionMatches(true, 0, name, 0, name.length())).collect(Collectors.toList());
    }

    public List<Contact> findByEmail(String email) {
        return contacts.stream().filter(contact -> contact.getEmail().regionMatches(true, 0, email, 0, email.length())).collect(Collectors.toList());
    }


}
