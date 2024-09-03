import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FileInput, Label, TextInput, Button, Select, Tooltip } from 'flowbite-react';
import { MdOutlineSave, MdOutlineDelete } from "react-icons/md";


function PhotoDetails({count, setCount}) {
    const [selectedFile, setSelectedFile] = useState(null); // State to manage the selected file
    const [hasFile, setHasFile] = useState(false);
    const fileInputRef = useRef(null); // Reference to the file input element
    const [preview, setPreview] = useState(null);
  
    const fileInputHandler = (e) => {
        const file = e.target.files[0]; // Get the first selected file
      
        if (file) {
            setSelectedFile(file);
            setHasFile(true);
        
            // Create a preview if the file is an image
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result); // Set the image preview
                };
                reader.readAsDataURL(file);
                setCount(count+1)
            } else {
                setPreview(null); // Clear preview for non-image files
            }
        } else {
            setSelectedFile(null);
            setPreview(null);
        }
    };

    const handleFile = (file) => {
        if (file) {
            setSelectedFile(file);
            setHasFile(true);
        
            // Create a preview if the file is an image
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                setPreview(reader.result); // Set the image preview
                };
                reader.readAsDataURL(file);
                setCount(count+1)
            } else {
                setPreview(null); // Clear preview for non-image files
            }
        } else {
            setSelectedFile(null);
            setPreview(null);
        }
    };
  
    const deleteFileHandler = (e) => {
        e.preventDefault();
        setSelectedFile(null);
        setHasFile(false);
        setPreview(null); // Clear the preview
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input
        }
        setCount(count-1);
    };
  
    const handleDragOver = (e) => {
        e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    };

    const handleDrop = (e) => {
        e.preventDefault(); // Prevent default behavior
        const file = e.dataTransfer.files[0]; // Get the first dropped file
        handleFile(file);
    };

    useEffect(() => {
        console.log('Has File:', hasFile);
    }, [hasFile]);

    return ( 
        <div className="w-full lg:w-3/5 lg:text-sm lg:p-6 flex flex-col bg-white items-center justify-center gap-4 p-4 rounded-xl shadow-lg">
            { !hasFile ?
            <Label
                onDragOver={handleDragOver}  // Enable drag over event
                onDrop={handleDrop}
                htmlFor="dropzone-file"
                className="flex h-48 w-full lg:h-28  cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-around px-4 py-2 h-full">
                    <div className='flex flex-col items-center justify-between gap-4'>
                        <svg
                            className="h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <div className='flex flex-col items-center justify-between gap-1'>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                    </div>
                    <FileInput ref={fileInputRef} id="dropzone-file" className="hidden" onChange={fileInputHandler}/>
                </div>
            </Label>
            : 
            <></>
            }

            {preview && (
            <div className="mt-4">
                <img src={preview} alt="Preview" className="max-h-40 rounded-lg shadow-md" />
            </div>
            )}

            {hasFile && (
                <div className="flex flex-row gap-4 items-center content-center justify-center">
                    <div className="text-sm text-gray-700">
                        <p><p className="font-bold inline">Selected File:</p> {selectedFile.name}</p>
                    </div>

                    <Tooltip content='Delete file'>
                        <Button size="xs" color='failure' className="text-white" onClick={deleteFileHandler} pill>
                            <MdOutlineDelete className='h-4 w-4' />
                        </Button>
                    </Tooltip>
                </div>
            )}

            {/* ID Size inputs */}
            { hasFile &&
                <div className='flex flex-row gap-2'>
                    <div>
                        <div>
                            <Label htmlFor="small" value="1x1 ID" />
                        </div>
                        <TextInput id="small" type="number" sizing="sm" />
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="small" value="2x2 ID" />
                        </div>
                        <TextInput id="small" type="number" sizing="sm" />
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="small" value="Passport" />
                        </div>
                        <TextInput id="small" type="number" sizing="sm" />
                    </div>
                </div>}

            {/* Document preferences inputs */}
            { hasFile &&
                <div className='flex flex-row gap-2 '>
                    <div className='w-1/2'>
                        <div>
                            <Label htmlFor="small" value="Document size" />
                        </div>
                        {/* <TextInput id="small" type="number" sizing="sm" /> */}
                        <Select id="paper-sizes" sizing="sm">
                            <option>A4</option>
                            <option>Letter</option>
                            <option>Legal</option>
                        </Select>
                    </div>
                    <div className='w-1/2'>
                        <div>
                            <Label htmlFor="small" value="No. of copies" />
                        </div>
                        <TextInput id="small" type="number" sizing="sm" />
                    </div>
                </div>}

            { hasFile &&
                <div className='flex flex-row w-full gap-2 items-center justify-around px-8 mt-4 mb-2'>
                    <Button size="xs" className='bg-[#E6AF2E] w-1/2'>
                        SAVE
                        <MdOutlineSave className='ml-1 h-4 w-4' />
                    </Button>
                    <Button size="xs" className='bg-[#30323D] w-1/2'>
                        DELETE
                        <MdOutlineDelete className='ml-1 h-4 w-4' />
                    </Button>
                </div>
            }

        </div>
     );
}

export default PhotoDetails;