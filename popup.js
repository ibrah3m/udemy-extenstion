$(function(){

    jQuery.ajax({
        url: 'https://www.udemy.com/api-2.0/users/me/subscribed-courses/?page_size=100',
        success: function (data) {
    
            enitre_courses = [];
            enitre_courses["results"] = data.results.filter(results => results.is_paid = true)
            next = data.next;
    
    
            while (next != null) {
    
                if (next != null) {
    
    
                    jQuery.ajax({
                        url: data.next,
                        success: function (next_data) {
                            enitre_courses.results.push(next_data.results.filter(next_results => next_results.is_paid = true));
                            next = next_data.next;
                        },
                        async: false
                    });
    
    
    
    
                }
    
            }
    
    
    
        },
        async: false
    });
    // get each course details
    
    $.each(enitre_courses.results, function (key, value) {
        jQuery.ajax({
            url:'https://www.udemy.com/api-2.0/course-landing-components/'+value.id+'/me?components=incentives',
            success: function (next_data) {
                value.length=juration.parse(next_data.incentives.video_content_length)
    
                
            },
            async: false
        });
    
    })
    // sort desc
    enitre_courses.results.sort(function(a, b) {
        return a.length - b.length;
    });


    // view the list 
      
    $.each(enitre_courses.results, function (key, value) {
        $('#list').append(

            `
            <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="`+value.image_240x135+`" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">`+value.title+`</h5>
                    <a href="https://www.udemy.com`+value.url+`" class="btn btn-primary">Go</a>
                    </div>
            </div>
            `
        
        
            );
    
    })
   
  });