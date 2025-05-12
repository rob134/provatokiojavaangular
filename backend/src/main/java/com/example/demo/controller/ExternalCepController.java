package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/cep")
public class ExternalCepController {
    private final String CEP_BASE_URL = "https://viacep.com.br/ws/";

    @GetMapping("/{cep}/json")
    public String getAddressByCep(@PathVariable String cep) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(CEP_BASE_URL + cep + "/json/", String.class);
    }
}
