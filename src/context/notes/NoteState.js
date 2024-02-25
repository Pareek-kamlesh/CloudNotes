import React, { useState } from "react";

import NoteContext from "./NoteContext";


const NoteState=(props)=>{
  const host = "http://localhost:5000";
    const notesInitial=[]
      const [notes, setNotes] = useState(notesInitial)

      const getNotes =async()=>{
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
         method: "GET", 
        
         headers: {
           "Content-Type": "application/json",
           "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMGI3ZTE3MGE3NWQ4OTdlOTRmZDMwIn0sImlhdCI6MTcwODI1NzE1NH0.kvdBBIGmXupL7ks1gTzI0ELGKbAoNkwwJTuT29c3484"
         },
        
        
       });
       const json= await response.json();
      //  console.log(json)
       setNotes(json)
       // API call finished
      
     }
      
      const addNote =async(title, description, tag)=>{
         // API call
         const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
         
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMGI3ZTE3MGE3NWQ4OTdlOTRmZDMwIn0sImlhdCI6MTcwODI1NzE1NH0.kvdBBIGmXupL7ks1gTzI0ELGKbAoNkwwJTuT29c3484"
          },
         
          body: JSON.stringify({title, description, tag}),
        });
        const json= await response.json();
        console.log(json)
        // API call finished
        const note=json;
        setNotes(notes.concat(note))
      }

      const deleteNote =async(id)=>{
         // API call
         const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
         
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMGI3ZTE3MGE3NWQ4OTdlOTRmZDMwIn0sImlhdCI6MTcwODI1NzE1NH0.kvdBBIGmXupL7ks1gTzI0ELGKbAoNkwwJTuT29c3484"
          },
         
        });
        const json= response.json();
        console.log(json)
        // API call finished

        const newNotes = notes.filter((note)=>{ return note._id!==id})
        setNotes(newNotes)
        
      }
      const editNote =async(id, title, description, tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
         
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMGI3ZTE3MGE3NWQ4OTdlOTRmZDMwIn0sImlhdCI6MTcwODI1NzE1NH0.kvdBBIGmXupL7ks1gTzI0ELGKbAoNkwwJTuT29c3484"
          },
         
          body: JSON.stringify({title, description, tag}),
        });
        const json= await response.json();
        console.log(json)
        // API call finished
        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let i = 0; i < newNotes.length; i++) {
          const element = newNotes[i];
          if(element._id===id){
            newNotes[i].title=title;
            newNotes[i].description=description;
            newNotes[i].tag=tag;
            break;
          }
          
          
        }
        setNotes(newNotes)
      }
   
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;