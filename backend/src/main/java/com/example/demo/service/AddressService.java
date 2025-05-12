package com.example.demo.service;

import com.example.demo.model.Address;
import com.example.demo.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public Address save(Address address) {
        return addressRepository.save(address);
    }

    public Page<Address> findAll(Pageable pageable) {
        return addressRepository.findAll(pageable);
    }

    public Address findById(Long id) {
        return addressRepository.findById(id).orElse(null);
    }

    public Address update(Long id, Address address) {
        Address existingAddress = findById(id);
        if (existingAddress != null) {
            existingAddress.setStreet(address.getStreet());
            existingAddress.setNumber(address.getNumber());
            existingAddress.setComplement(address.getComplement());
            existingAddress.setNeighborhood(address.getNeighborhood());
            existingAddress.setCity(address.getCity());
            existingAddress.setState(address.getState());
            existingAddress.setPostalCode(address.getPostalCode());
            return addressRepository.save(existingAddress);
        }
        return null;
    }

    public void delete(Long id) {
        addressRepository.deleteById(id);
    }
}
