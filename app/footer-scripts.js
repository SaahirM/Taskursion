"use client";
import { useEffect } from "react";

export default function FooterScripts() {
    /**
     * Workaround to import bootstrap's js at the client. Importing the normal
     * way with an import at the top of the page doesn't work because there's
     * no "document" at the server. This code is from a blog
     * URL: https://blog.logrocket.com/handling-bootstrap-integration-next-js/
     */
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
      }, []);
}