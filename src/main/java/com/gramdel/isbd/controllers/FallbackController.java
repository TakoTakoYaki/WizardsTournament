package com.gramdel.isbd.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FallbackController {
    @RequestMapping(path = {"/"})
    private String forwardToReact() {
        return "forward:/index.html";
    }
}
