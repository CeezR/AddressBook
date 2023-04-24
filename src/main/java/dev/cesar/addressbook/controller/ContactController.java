package dev.cesar.addressbook.controller;

import dev.cesar.addressbook.exception.ContactNotFoundException;
import dev.cesar.addressbook.model.Contact;
import dev.cesar.addressbook.repository.ContactRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ContactController {
    @Autowired
    private ContactRepository contactRepository;

    @GetMapping("/contacts")
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @GetMapping("/contacts/{id}")
    public Contact findById(@PathVariable String id) throws ContactNotFoundException {
        return contactRepository.findById(id);
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/contacts")
    public Contact create(@Valid @RequestBody Contact contact) {
        String id = UUID.randomUUID().toString();
        contact.setId(id);
        return contactRepository.Create(contact);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/contacts/{id}")
    public void update(@RequestBody Contact contact, @PathVariable String id) {
        contactRepository.update(contact, id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/contacts/{id}")
    public void delete(@PathVariable String id) {
        contactRepository.delete(id);
    }

    @GetMapping("/contacts/search/id/{id}")
    public Contact searchContactById(@PathVariable String id) throws ContactNotFoundException {
        return contactRepository.findById(id);
    }

    @GetMapping("/contacts/search/name/{name}")
    public List<Contact> searchContactsByName(@PathVariable String name) {
        return contactRepository.findByName(name);
    }

    @GetMapping("/contacts/search/email/{email}")
    public List<Contact> searchContactsByEmail(@PathVariable String email) {
        return contactRepository.findByEmail(email);
    }
}
