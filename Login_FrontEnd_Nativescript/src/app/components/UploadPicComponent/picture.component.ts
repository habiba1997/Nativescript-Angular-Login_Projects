import { Component, OnInit } from "@angular/core";
import * as imageSourceModule from "tns-core-modules/image-source";
var fs = require("tns-core-modules/file-system");
let imagepicker = require("nativescript-imagepicker");

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./picture.component.html",
    styleUrls:["../CSS.component.css"]
})
export class PictureComponent  {
   Welcome = "Upload Images"
    public myImage="";
    
   
   getPicture(args)
    {
        console.log("pressed");
        var miliseconds = (new Date).getTime();
        var that = this;
        var path;
        let context = imagepicker.create(
            {
                mode:"single"
            });
        context.authorize().then(()=>
        {
            return context.present();
        })
        .then(
            (selection)=>{
            selection.forEach(function(selected)
            {
                imageSourceModule.fromAsset(selected).then(function(imagesource){
                let folder = fs.knownFolders.documents();
                var path = fs.path.join(folder.path, miliseconds+".png");
                var saved = imagesource.saveToFile(path,"png");
                that.myImage = path;
                if (saved) {
                    console.log("Image saved successfully!");
                    let file = fs.File.fromPath(path);
                    console.log(file);
                }else{
                    console.log("Error! - image couldnt save.");
                }
                })
            }) 
                                    

            }
            )
        }
    


}
