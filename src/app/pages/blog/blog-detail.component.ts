import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FooterWidget } from '../landing/components/footerwidget';
import { TopbarWidget } from '../landing/components/topbarwidget.component';
import { ApiService } from '../../core/services/api.service';
import { Blog } from '../uikit/blogListing';

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
        <div class="grid md:grid-cols-12 grid-cols-1 gap-6">
            <div class="lg:col-span-8 md:col-span-6">
                <div class="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">

                    <img [src]="blogPost?.image" alt="">

                    <div class="p-6">
                        <p class="text-slate-400">{{blogPost?.title}}</p>
                        <p class="text-slate-400 italic border-x-4 border-orange-500 rounded-ss-xl rounded-ee-xl mt-3 p-3">{{blogPost?.body}}</p>
                    </div>
                </div>

            </div>

            <div class="lg:col-span-4 md:col-span-6">
                <div class="sticky top-20">
                    <h5 class="text-lg font-medium bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center">Author</h5>
                    <div class="text-center mt-8">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png" class="h-20 w-20 mx-auto rounded-full shadow mb-4" alt="">

                        <a class="text-lg font-medium hover:text-orange-500 transition-all duration-500 ease-in-out h5">{{blogPost?.author?.email}}</a>
                        <p class="text-slate-400">Content Writer</p>
                    </div>

          
                </div>
            </div>
        </div>
    </div>

</section>
                <footer-widget />
            </div>
        </div>
  
  
  `,
})
export class BlogDeatailComponent  implements OnInit{


      private apiService = inject(ApiService);
    
        private route = inject(ActivatedRoute); // ✅ Inject ActivatedRoute


    blogPost: Blog;
    loading: boolean;



  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id'); // ✅ Capture ID from route

    if (blogId) {
      this.apiService.get(`/blogPosts/${blogId}`).subscribe({
        next: (res) => {
          this.blogPost = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to fetch blog post:', err);
          this.loading = false;
        }
      });
    } else {
      console.error('No blog ID found in route.');
    }
  }


}
