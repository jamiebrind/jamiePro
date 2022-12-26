package main

import(
	"fmt"
	"log"
	"net/http"
)

func formHandler(w, http.ResponseWriter, r *http.Request){
	if err:= r.ParseForm(); err!= nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}
	fmt.Fprintf(w, "POST request successful")
	name := r.FormValue("name")
	fmt.Fprintf(w, "Name = %s\n", name)
}

func helloHandler(w http.ResponseWriter, r *http.Request){
if r.URL.Path != "/hello" {
	http.Error(w, "404 not found", htpp.StatusNotFound)
	return
}
if r.Method != "GET" {
	http.Error(w, "method is not supported", http.StatusNotFound)
	return
}
fmt.Fprintf(w, "hello!")
}

func main(){
	fileserver := http.FileServer(http.Dir("./static"))
	http.Handle("/", fileserver)
	http.HandleFun("/index", formHandler)
	http.HandleFunc("/hello", helloHandler)

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServer(":8080", nil); err !=nil{
		log.Fatal(err)
	}
}
