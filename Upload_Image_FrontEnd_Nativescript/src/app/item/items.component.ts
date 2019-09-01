import { Component, OnInit } from "@angular/core";
import * as imageSourceModule from "tns-core-modules/image-source";
var fs = require("tns-core-modules/file-system");
let imagepicker = require("nativescript-imagepicker");
let bghttp = require("nativescript-background-http");

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    styleUrls: ["./items.component.css"]
})
export class ItemsComponent  {
   Welcome = "Hey"
    public myImage="";
    
    upload(file: string) {
        console.log("file" + file);
        var url ="http://192.168.1.6:3001/api/Containers/therafapp/upload";
        // upload configuration
        var session = bghttp.session("image-upload");
        var request = {
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream"
            },
            description: "Button file uploading",
            androidNotificationTitle: "Button file uploading",
            androidAutoDeleteAfterUpload: false,
        };
        var task = session.uploadFile(file, request);
        /*let params = [
            { name: "test", value: file },
            { name: "fileToUpload", filename: file, mimeType: 'image/jpeg' }
        ];*/
        //var task: bghttp.Task = session.multipartUpload(params, request);

        return new Promise((resolve, reject)=> {
            task.on("error", e => resolve(e));
            task.on("responded", (e:any) => {
                const result = JSON.parse(JSON.parse(JSON.stringify(e.data)))
                return resolve(result.result.files[0])
            });
        })
    }

    respondedHandler(e) {
        alert("received " + e.responseCode + " code. Server sent: " + e.data);
    }
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
                    console.log(file._path);
                    let out = that.upload(file._path);
                    console.log("out: "+out)
                }
                
                else{
                    console.log("Error! - image couldnt save.");
                }
                })
            }) 
                                    

            }
            )
        }
    

    }
