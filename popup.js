$(function () {

    fetch('https://www.udemy.com/api-2.0/users/me/subscribed-courses/?page_size=100&max_progress=0&min_progress=0').then(r => r.json()).then(
        next_data => {
            entire_courses = [];

            entire_courses["results"] = next_data.results.filter(results => results.is_paid = true),
                next = next_data.next;


        }
    ).then(async r => {

        while (next != null) {

            await fetch(next).then(r => r.json()).then(
                next_data => {
                    entire_courses.results.push(next_data.results.filter(results => results.is_paid = true)),
                        next = next_data.next


                }
            )

        }


                entire_mapped_courses = Promise.all(entire_courses.results.map(async function (value) {

                    await fetch('https://www.udemy.com/api-2.0/course-landing-components/' + value.id + '/me?components=incentives').then(r => r.json()).then(
                        next_data => {
                            try {
                                value.video_length = juration.parse(next_data.incentives.video_content_length)
                            } catch (err) {
                                console.log(err)
                            }

                        }
                    ).catch((error) => {
                        console.log(error)
                    });

                })).then(results => {



                    entire_courses.results.sort(function (a, b) {

                        return a.video_length - b.video_length;
                    });


                    // view the list 

                    $.each(entire_courses.results, function (key, value) {
                        try {

                            $('#list').append(

                                `
                            <div class="card" style="width: 18rem;">
                                    <img class="card-img-top" src="` + value.image_240x135 + `" alt="Card image cap">
                                    <div class="card-body">
                                    <h5 class="card-title">` + value.title + `</h5>
                                    <p class="card-text">`+juration.stringify(value.video_length, { format: 'short' })+`</p>
                                    <a href="https://www.udemy.com` + value.url + `"  target="_blank" class="btn btn-primary">Go</a>
                                    </div>
                            </div>
                            `
    
    
                            );

                        } catch (err) {
                            console.log(err)
                        }
                   

                    })


                })





    })




});