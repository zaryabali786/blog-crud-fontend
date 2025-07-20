import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterWidget } from '../landing/components/footerwidget';
import { TopbarWidget } from '../landing/components/topbarwidget.component';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule,RouterLink,TopbarWidget,FooterWidget],
  template: `
        <div class="bg-surface-0 dark:bg-surface-900">
            <div id="home" class="landing-wrapper overflow-hidden">
                <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
              <section class="relative table w-full items-center py-36 bg-top bg-no-repeat bg-cover" >
    <div class="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
    <div class="container relative">
        <div class="grid grid-cols-1 pb-8 text-center mt-10">
            <h3 class="text-4xl leading-normal tracking-wider font-semibold text-white">Blogs / News</h3>
        </div><!--end grid-->
    </div><!--end container-->
    
    <div class="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
        <ul class="tracking-[0.5px] mb-0 inline-block">
            <li class="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><a routerLink="/">Cartzio</a></li>
            <li class="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="mdi mdi-chevron-right"></i></li>
            <li class="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">Blogs</li>
        </ul>
    </div>
</section>

<section class="relative md:py-24 py-16">
    <div class="py-12 px-12 mx-0 mt-20 lg:mx-20">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            <div *ngFor="let item of blogPostsList" class="group relative overflow-hidden">
                <div class="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                    <img [src]="item.image" class="group-hover:scale-110 duration-500" alt="">
                </div>

                <div class="mt-6">
                    <div class="flex mb-4">
                        <span class="flex items-center text-slate-400 text-sm"><i data-feather="calendar" class="size-4 text-slate-900 dark:text-white me-1.5"></i>{{item.createdAt |date}}</span>
                        <span class="flex items-center text-slate-400 text-sm ms-3"><i data-feather="clock" class="size-4 text-slate-900 dark:text-white me-1.5"></i>5 min read</span>
                    </div>

                    <a  [routerLink]="['/', item.id]"  class="title text-lg font-semibold hover:text-orange-500 duration-500 ease-in-out">{{item.title}}</a>
                    <p class="text-slate-400 mt-2">{{item.body}}</p>

             
                </div>
            </div>
        </div><!--end grid-->

    
    </div><!--end container-->
</section>
                <footer-widget />
            </div>
        </div>
  
  
  `,
})
export class BlogsComponent  implements OnInit{


      private apiService = inject(ApiService);
    
  blogData = [
    {
      image:'assets/images/blog/1.jpg',
      date:'13th Sep 2024',
      title:'The History Of Patterned Dresses',
      desc:'This is required when, for example, the final text is not yet available.'
    },
    {
      image:'assets/images/blog/2.jpg',
      date:'29th Nov 2024',
      title:'Swimsuits For The Whole Family',
      desc:'This is required when, for example, the final text is not yet available.'
    },
    {
      image:'assets/images/blog/3.jpg',
      date:'29th Dec 2024',
      title:'Good Products For Lovely Girls',
      desc:'This is required when, for example, the final text is not yet available.'
    },
    {
      image:'assets/images/blog/4.jpg',
      date:'13th March 2024',
      title:'Latest Swimsuit Model This Year',
      desc:'This is required when, for example, the final text is not yet available.'
    },
    {
      image:'assets/images/blog/5.jpg',
      date:'5th May 2024',
      title:'Summer Travel Fashion 2023',
      desc:'This is required when, for example, the final text is not yet available.'
    },
    {
      image:'assets/images/blog/6.jpg',
      date:'19th June 2024',
      title:'Exploring the Timeless Allure of Fashion',
      desc:'This is required when, for example, the final text is not yet available.'
    },
    {
      image:'assets/images/blog/7.jpg',
      date:'20th Sep 2024',
      title:'A Chic Journey Through Fashion Trends',
      desc:'This is required when, for example, the final text is not yet available.'
    },
    {
      image:'assets/images/blog/8.jpg',
      date:'31st Aug 2024',
      title:'Unique Autumn Fashion Ideas',
      desc:'This is required when, for example, the final text is not yet available.'
    },
    {
      image:'assets/images/blog/9.jpg',
      date:'1st Sep 2024',
      title:'Tips For Wearing Loose T-shirts',
      desc:'This is required when, for example, the final text is not yet available.'
    },
  ]
    blogPostsList: any[];
    loading: boolean;


  ngOnInit(): void {
              this.apiService.get('/blogPosts').subscribe((res)=>{
            let response = res[0]

            debugger
            if (Array.isArray(res) && Array.isArray(response)) {
            this.blogPostsList =response; // ✅ correct
            } else {
            this.blogPostsList = []; // fallback to empty array
        }
      
            this.loading=false;

        })
  }
}
