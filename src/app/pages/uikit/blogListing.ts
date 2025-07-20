import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { ApiService } from '../../core/services/api.service';

export interface Blog {
    id?: string;
    title?: string;
    body?: string;
    author?: string;
    image?: string; // base64 string
}


@Component({
    selector: 'app-blog-list',
    standalone: true,
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
        
    ],
    template: `
    
  
    
    <div class="card">
            <div class="font-semibold text-xl mb-4">Blogs</div>
            <p-table
                [value]="blogPostsList"
                #dt1
                dataKey="_id"
                [rows]="10"
                [loading]="loading"
                [rowHover]="true"
                [showGridlines]="true"
                [paginator]="true"
                responsiveLayout="scroll"
            >
       
                <ng-template #caption>

                         <div class="flex justify-between items-center flex-column sm:flex-row">
                        <button pButton label="Add New" class="p-button-outlined mb-2" icon="pi pi-plus" (click)="openNew()"></button>
                        <p-iconfield iconPosition="left" class="ml-auto">
                            <p-inputicon>
                                <i class="pi pi-search"></i>
                            </p-inputicon>
                            <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Search keyword" />
                        </p-iconfield>
                    </div>
                    </ng-template>
                 <ng-template #header>
                     <tr>
                         <th style="min-width: 12rem">Image</th>
                         <th style="min-width: 12rem">Title</th>
                         <th style="min-width: 12rem">Description</th>
                         <th style="min-width: 14rem">Author</th>
                         <th style="min-width: 10rem">ACtion</th>
                 >
                    </tr>
            </ng-template>

                <ng-template #body let-blogPost>
                    <tr>
                        <td>
                            <div class="flex items-center gap-2">
                                <img [src]="blogPost?.image"  width="30" />
                               
                            </div>
                        </td>
                        <td>
                            {{ blogPost?.title }}
                        </td>

                           <td>
                            {{ blogPost?.body }}
                        </td>
                    
                        <td>
                            {{ blogPost?.author?.email }}
                        </td>
                            <td>
                               <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editblogFn(blogPost)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteblogFn(blogPost)" />
                    </td>
                       
                    
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="8">No customers found.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="8">Loading customers data. Please wait.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>


        
     <p-dialog [(visible)]="blogDialog" [style]="{ width: '300px' }" header="Blog Post" [modal]="true">
    <ng-template #content>
        <div class="flex flex-col gap-5">

            <!-- Image Preview (Edit Mode) -->
            <img *ngIf="blog.image" [src]="blog.image" alt="Uploaded Image" class="block w-full max-h-48 object-cover mb-4" />

                <!-- Image Upload Input -->
            <div>
                <label class="block font-bold mb-2">Upload Image</label>
                <input type="file" accept="image/*" (change)="onImageUpload($event)" />
                <small class="text-red-500" *ngIf="submitted && !blog.image">Image is required.</small>
            </div>
            <!-- Title Input -->
            <div>
                <label for="title" class="block font-bold mb-2">Title</label>
                <input type="text" pInputText id="title" [(ngModel)]="blog.title" required />
                <small class="text-red-500" *ngIf="submitted && !blog.title">Title is required.</small>
            </div>

            <!-- Body Textarea -->
            <div>
                <label for="body" class="block font-bold mb-2">Body</label>
                <textarea id="body" pTextarea [(ngModel)]="blog.body" rows="5" required></textarea>
                <small class="text-red-500" *ngIf="submitted && !blog.body">Body is required.</small>
            </div>

       

        
        </div>
    </ng-template>

    <ng-template #footer>
        <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()" />
        <p-button label="Save" icon="pi pi-check" text (click)="saveBlogPost()" />
    </ng-template>
</p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />

      `,
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    
    providers: [ConfirmationService, MessageService]
})
export class BlogListingComponent implements OnInit {

  private apiService = inject(ApiService);


    loading: boolean = true;

    submitted: boolean;

    blog!: Blog;

    blogDialog: boolean;

    blogPostsList : Blog[]=[];

    updateBlog: boolean;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}


       openNew() {
        this.submitted = false;
        this.blog={};
        this.blogDialog = true;
    }

    ngOnInit() {
        this.getBlogList()

    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }



getBlogList(){
            this.apiService.get('/blogPosts').subscribe((res)=>{
            let response = res[0]

            
            if (Array.isArray(res) && Array.isArray(response)) {
            this.blogPostsList =response; // ✅ correct
            } else {
            this.blogPostsList = []; // fallback to empty array
        }
      
            this.loading=false;

        })
}

        hideDialog() {
        this.blogDialog = false;
        this.submitted = false;
    }

    editblogFn(blog:any){
        this.blog={...blog};
        this.blogDialog = true;
        this.updateBlog=true;

    }

       saveBlogPost(blog?:any) {
        this.submitted = true;
        let url='/blogPosts';
        this.loading = true

        let user =JSON.parse(localStorage.getItem('user'));
        this.blog.author=user?.id

        if(!this.updateBlog){
      this.apiService.post(url,this.blog).subscribe((res)=>{
            this.blogDialog = false;
            this.loading = false
            this.updateBlog=false
            this.blog = {};
            this.getBlogList()
        })
        }
        else{
       this.apiService.put(url+'/'+`${this.blog?.id}`,this.blog).subscribe((res)=>{
            this.blogDialog = false;
            this.loading = false
            this.blog = {};
            this.updateBlog=false

            this.getBlogList()
        })
        }
        }
    

    deleteblogFn(blog?: Blog) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + blog?.title + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.blog = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'blog Deleted',
                    life: 3000
                });
              let url='/blogPosts';
                this.apiService.delete(url+'/'+`${blog?.id}`).subscribe((res)=>{
                    this.getBlogList()

                })
            }
        });
    }


    onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            this.blog.image = reader.result as string;
        };
        reader.readAsDataURL(file); // converts to base64
    }
}





}
