import styles from './TagsInput.module.scss'
import { WithContext as ReactTags } from 'react-tag-input';
import {useEffect, useState} from "react";

interface TagsInputProps{
  tags:any,
  onInput?:(e:any)=>void,
  suggestions:any,
  setTags:(e:any)=>void,
  placeholder:string,
}

export default function TagsInput({tags, setTags, onInput=()=>{}, suggestions,placeholder}:TagsInputProps){

  const handleDelete = (i:any) => {
    setTags(tags.filter((tag:any, index:any) => index !== i));
  };

  const handleAddition = (tag:any) => {
    if(tags)
      setTags([...tags, tag]);
    else{
      setTags([tag]);
    }

  };

  const handleDrag = (tag:any, currPos:any, newPos:any) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index:any) => {
  };




  return(
  <div className={"app"}>
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition="top"
        minQueryLength={1}
        placeholder={placeholder}
        autofocus={false}
      />
    </div>
  </div>
  )
}
